# UCSD member applications: Tally → Notion

The UCSD chapter application is a Tally form. Every "Join" button on the
chapter (hero, bottom section, top bar) opens it in a new tab, and Tally
writes each submission into a Notion database. This replaces the Google Form.

## 1. Create the Tally form

1. Sign in at https://tally.so and create a blank form.
2. Rebuild the Google Form question for question. Keep the question text and
   the required flags so applicants see no change.
3. Under **Design**, pick the dark theme and add the SDx logo.
4. Under **Settings → Access**, leave the form open. Do not require sign-in.
5. Publish the form and copy the share link from the **Share** dialog. It
   looks like `https://tally.so/r/<id>`.

## 2. Connect Tally to Notion

1. In the Tally form, open **Integrations → Notion → Connect**.
2. Notion asks which pages Tally may use. Pick the **Applications** database
   in the SDxUCSD core documentation page, under the Applications section.
3. Map each Tally question to the matching Notion property. Map the
   applicant's name to the title property so each row reads as a person.
4. Submit a test entry from the Tally preview and check that a row appears.

## 3. Point the site at the form

1. Open `app/chapters/ucsd/lib/links.ts`.
2. Set `UCSD_JOIN_FORM` to the share link from step 1.5.
3. Deploy. Until then the buttons keep opening the old Google Form.
