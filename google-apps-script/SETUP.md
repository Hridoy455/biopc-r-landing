# Google Sheets registration — setup

This connects your landing-page registration form to a Google Sheet (no Google
Forms, no database). Every submission becomes a row, and payment screenshots can
be saved to a Drive folder. A confirmation email is sent automatically.

## 1. Create the spreadsheet

1. Go to <https://sheets.google.com> and create a new blank spreadsheet.
2. Name it something like **BioPC — R Programming Registrations**.

## 2. Add the script

1. In the spreadsheet menu: **Extensions → Apps Script**.
2. Delete any starter code, then paste the entire contents of [`Code.gs`](./Code.gs).
3. At the top of the file, set:
   - `SHARED_SECRET` — a long random string. **Use the same value** for
     `SHEETS_SHARED_SECRET` in your site's environment variables.
   - `SCREENSHOT_FOLDER_ID` — *(optional)* to save payment screenshots:
     create a folder in Google Drive, open it, and copy the ID from the URL
     (`https://drive.google.com/drive/folders/THIS_IS_THE_ID`). Leave `''` to skip.
4. Click the **Save** icon.

## 3. Deploy as a Web App

1. Click **Deploy → New deployment**.
2. Click the gear ⚙ next to "Select type" → **Web app**.
3. Configure:
   - **Description:** BioPC registration receiver
   - **Execute as:** Me
   - **Who has access:** Anyone
4. Click **Deploy**. Approve the permissions prompt (needed to write to the
   sheet, save screenshots, and send email). You may see an "unverified app"
   screen — click **Advanced → Go to (project name)** since it's your own script.
5. Copy the **Web app URL** (ends in `/exec`).

## 4. Configure the site

In your site's environment variables (`.env.local` locally, or the Vercel
dashboard), set:

```
SHEETS_WEBAPP_URL=https://script.google.com/macros/s/XXXX/exec
SHEETS_SHARED_SECRET=the-same-secret-you-put-in-Code.gs
```

## 5. Test

- Submit the form on your site. A new row should appear in the **Registrations**
  tab within a couple of seconds, and the student should receive a confirmation
  email.
- You can also open the Web App URL directly in a browser — it returns
  `{"ok":true,"service":"BioPC registration receiver"}`.

## Updating the script later

If you edit `Code.gs`, redeploy: **Deploy → Manage deployments → (edit ✏) →
Version: New version → Deploy**. The URL stays the same.

## Managing registrations

- The **Status** column starts as `Pending`. Change it to `Approved` or
  `Rejected` as you verify payments.
- Use the sheet's built-in filters to search/sort, and **File → Download → CSV**
  to export.

## Troubleshooting

| Symptom | Fix |
|---|---|
| Form says "could not save" | Check `SHEETS_WEBAPP_URL` is the `/exec` URL and `SHEETS_SHARED_SECRET` matches `SHARED_SECRET`. |
| Rows not appearing | Re-run the deployment; ensure "Who has access" is **Anyone**. |
| No confirmation email | Gmail send quota may be exceeded, or the email was invalid. Registration is still saved. |
| Screenshot column empty | Set `SCREENSHOT_FOLDER_ID` and redeploy. |
