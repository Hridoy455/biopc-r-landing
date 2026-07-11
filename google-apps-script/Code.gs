/**
 * BioPC — Registration receiver (Google Apps Script Web App)
 * -----------------------------------------------------------
 * Appends each registration to a Google Sheet and (optionally) saves the
 * payment screenshot to a Drive folder. Deploy as a Web App (see SETUP.md).
 *
 * Configure the two values below, then Deploy > New deployment > Web app:
 *   - Execute as: Me
 *   - Who has access: Anyone
 * Copy the resulting Web App URL into your site's SHEETS_WEBAPP_URL env var.
 */

// Must match SHEETS_SHARED_SECRET in your site's environment variables.
var SHARED_SECRET = 'change-me-to-a-long-random-string';

// Optional: a Drive folder ID to store payment screenshots. Leave '' to skip.
// (Create a folder in Drive, open it, and copy the ID from the URL.)
var SCREENSHOT_FOLDER_ID = '';

var SHEET_NAME = 'Registrations';

var HEADERS = [
  'Submitted At', 'Full Name', 'Email', 'Phone', 'WhatsApp',
  'University', 'Department', 'Country', 'Academic Level', 'Current Skills',
  'Payment Method', 'Transaction ID', 'Screenshot', 'Status', 'IP', 'User Agent',
];

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse({ ok: false, error: 'No data.' });
    }

    var data = JSON.parse(e.postData.contents);

    if (String(data.secret || '') !== SHARED_SECRET) {
      return jsonResponse({ ok: false, error: 'Unauthorized.' });
    }

    var sheet = getSheet();

    var screenshotLink = '';
    if (data.screenshotData && SCREENSHOT_FOLDER_ID) {
      screenshotLink = saveScreenshot(data.screenshotData, data.screenshotName, data.email);
    }

    sheet.appendRow([
      data.submittedAt || new Date().toISOString(),
      data.fullName || '',
      data.email || '',
      data.phone || '',
      data.whatsapp || '',
      data.university || '',
      data.department || '',
      data.country || '',
      data.academicLevel || '',
      data.currentSkills || '',
      data.paymentMethod || '',
      data.transactionId || '',
      screenshotLink,
      'Pending',      // Status — you update this to Approved/Rejected in the sheet.
      data.ip || '',
      data.userAgent || '',
    ]);

    // Optional: send a confirmation email to the student.
    if (data.email) {
      sendConfirmationEmail(data);
    }

    return jsonResponse({ ok: true });
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err) });
  }
}

function doGet() {
  return jsonResponse({ ok: true, service: 'BioPC registration receiver' });
}

function getSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function saveScreenshot(dataUrl, name, email) {
  try {
    var match = /^data:([^;]+);base64,(.*)$/.exec(dataUrl);
    if (!match) return '';
    var contentType = match[1];
    var bytes = Utilities.base64Decode(match[2]);
    var safeName = (email || 'payment').replace(/[^a-z0-9._-]/gi, '_') + '_' + (name || 'screenshot');
    var blob = Utilities.newBlob(bytes, contentType, safeName);
    var folder = DriveApp.getFolderById(SCREENSHOT_FOLDER_ID);
    var file = folder.createFile(blob);
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    return file.getUrl();
  } catch (err) {
    return 'Error saving screenshot: ' + err;
  }
}

/**
 * Sends a confirmation email to the student. Uses the Gmail quota of the
 * account that owns this script. Customize the copy as you like.
 */
function sendConfirmationEmail(data) {
  try {
    var subject = 'We received your registration — R Programming for Biologists (BioPC)';
    var body =
      'Hi ' + (data.fullName || 'there') + ',\n\n' +
      'Thank you for registering for "R Programming for Biologists" with BioPC.\n\n' +
      'Here is what we received:\n' +
      '  • Course: R Programming for Biologists\n' +
      '  • Payment method: ' + (data.paymentMethod || '-') + '\n' +
      '  • Transaction ID: ' + (data.transactionId || '-') + '\n' +
      '  • Status: Pending verification\n\n' +
      'Next steps: our team will verify your payment and confirm your seat by email. ' +
      'Please keep an eye on your inbox (and spam folder).\n\n' +
      'Questions? Reply to this email or contact research@biopc.org.\n\n' +
      'Warm regards,\n' +
      'BioPC — A Bioinformatics Lab of Research and Training';

    MailApp.sendEmail({ to: data.email, subject: subject, body: body });
  } catch (err) {
    // Non-fatal: registration is still stored even if the email fails.
    Logger.log('Email failed: ' + err);
  }
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
