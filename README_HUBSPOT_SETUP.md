# HubSpot Integration Setup Guide

This guide walks you through setting up the HubSpot integration for the SDx Executive Network application form.

## Step 1: Create a HubSpot Private App

1. **Log into your HubSpot account**
2. **Navigate to Settings** (gear icon in the top right)
3. **Go to Integrations > Private Apps**
4. **Click "Create private app"**
5. **Fill in the basic info:**
   - App name: "SDx Executive Network Integration"
   - Description: "Integration for executive application form"

6. **Set up scopes on the "Scopes" tab:**
   - **CRM**: `crm.objects.contacts.read` and `crm.objects.contacts.write`

7. **Click "Create app"**
8. **Copy the access token** (you'll need this for your environment variables)

## Step 2: Create Environment Variables

Create a `.env.local` file in your project root with:

```bash
# HubSpot Private App Access Token
HUBSPOT_ACCESS_TOKEN=your_hubspot_access_token_here
```

⚠️ **Important**: Never commit your `.env.local` file to version control. It should already be in your `.gitignore`.

## Step 3: Test the Integration

1. **Start your development server**: `npm run dev`
2. **Go to the executives page**: `http://localhost:3000/executives`
3. **Fill out and submit the form**
4. **Check your HubSpot contacts** to see if the submission was recorded

## What the Integration Does

The form integration:

1. **Creates contacts** in HubSpot with the submitted information
2. **Sets lead status** to "NEW" and lifecycle stage to "lead"
3. **Sets lead source** to "SDx Executive Network" (perfect for filtering/segmentation)
4. **Sets original source** to "Executive Application Form" for attribution
5. **Handles duplicate contacts gracefully** (returns success if contact already exists)
6. **Provides user feedback** for both success and error cases

## Contact Properties Set

The integration sets these HubSpot contact properties:

- `email` - The applicant's email
- `company` - The applicant's company
- `jobtitle` - The applicant's role/title
- `hs_lead_status` - Set to "NEW"
- `lifecyclestage` - Set to "lead"
- `lead_source` - Set to "SDx Executive Network" (use this to filter/segment executives)
- `original_source` - Set to "Executive Application Form"

## Segmentation & Workflows

With the `lead_source` set to "SDx Executive Network", you can easily:

1. **Create a contact list** in HubSpot filtered by `Lead source is SDx Executive Network`
2. **Set up automated workflows** triggered when `Lead source is SDx Executive Network`
3. **Create executive-specific email sequences** and nurture campaigns
4. **Generate reports** on executive network applications vs other lead sources

## Customization

You can customize the integration by:

1. **Adding more form fields** to both the form and the API route
2. **Setting additional HubSpot properties** in the contact object
3. **Creating custom workflows** in HubSpot based on the lead source
4. **Setting up email notifications** in HubSpot when new executives apply

## Troubleshooting

### Common Issues:

1. **"Missing required fields" error**: Ensure all required fields are filled
2. **"Failed to submit application" error**: Check your HubSpot access token and permissions
3. **Contact not appearing in HubSpot**: Verify your access token has the correct scopes (`crm.objects.contacts.read` and `crm.objects.contacts.write`)

### Checking Logs:

Check your server logs (`npm run dev` console) for detailed error messages if submissions fail. 