# UCSD member applications: Tally → Notion

The UCSD chapter application lives in Tally and is embedded on the site at
`/chapters/ucsd/apply` (`ucsd.sdx.community/apply`). Tally writes each
submission into a Notion database. This replaces the Google Form.

## 1. Create the Tally form

1. Sign in at https://tally.so and create a blank form.
2. Rebuild the Google Form question for question. Keep the same question
   text and the same required flags so applicants see no change.
3. Under **Design**, pick the dark theme. The site embeds the form with a
   transparent background, so the dark theme is what makes the text readable.
4. Under **Settings → Access**, leave the form open. Do not require sign-in.
5. Publish the form. In the **Share** dialog, copy the link. The form ID is
   the part after `tally.so/r/`.

## 2. Connect Tally to Notion

1. In the Tally form, open **Integrations → Notion → Connect**.
2. Notion asks which pages Tally may use. Pick the **Applications** database
   (it sits in the SDxUCSD core documentation page under the Applications
   section).
3. Map each Tally question to the matching Notion property. Map the
   applicant's name to the title property so each row reads as a person.
4. Submit a test entry from the Tally preview and check that a row appears.

## 3. Point the site at the form

1. Open `app/chapters/ucsd/lib/links.ts`.
2. Set `UCSD_TALLY_FORM_ID` to the ID from step 1.5.
3. Deploy. While the ID is empty the apply page shows a holding message with
   the chapter email instead of the form.

## How the page finds the form

`app/chapters/ucsd/apply/page.tsx` renders `TallyEmbed`, which loads
`https://tally.so/widgets/embed.js`. The widget sizes the iframe to the form
and passes `transparentBackground=1` so the form sits on the site's dark
background. If the script is blocked, the iframe still loads at a fixed
height.

Every "Join" button on the chapter (hero, bottom section, top bar) links to
the apply page through `ucsdPath()`, which returns `/apply` on the subdomain
and `/chapters/ucsd/apply` on sdx.community.
