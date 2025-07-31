import { NextRequest, NextResponse } from 'next/server';
import { Client } from '@hubspot/api-client';

const hubspotClient = new Client({ accessToken: process.env.HUBSPOT_ACCESS_TOKEN });

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, company, role } = body;

    // Validate required fields
    if (!email || !company || !role) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create or update contact in HubSpot
    const contactObj = {
      properties: {
        email: email,
        company: company,
        jobtitle: role,
        hs_lead_status: 'NEW',
        lifecyclestage: 'lead',
        // Use standard lead source property to differentiate
        contact_source: 'SDx Executive Network',

      }
    };

    // Create/Update contact
    const contactResponse = await hubspotClient.crm.contacts.basicApi.create(contactObj);
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Application submitted successfully',
        contactId: contactResponse.id 
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('HubSpot API error:', error);
    
    // Handle specific HubSpot errors - contact already exists
    if (error?.status === 409 || (error?.message && error.message.includes('CONTACT_EXISTS'))) {
      return NextResponse.json(
        { 
          success: true, 
          message: 'Application received (contact already exists in system)'
        },
        { status: 200 }
      );
    }
    
    if (error?.status === 400) {
      return NextResponse.json(
        { error: 'Invalid data provided' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to submit application' },
      { status: 500 }
    );
  }
} 