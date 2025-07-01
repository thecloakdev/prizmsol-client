import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const query = searchParams.get('q');
        const page = searchParams.get('page') || '1';

        // Validate query parameter
        if (!query || query.trim().length === 0) {
            return NextResponse.json(
                { error: 'Query parameter is required' },
                { status: 400 }
            );
        }

        // Check for required environment variables
        const apiKey = process.env.GOOGLE_API_KEY;
        const searchEngineId = process.env.GOOGLE_SEARCH_ENGINE_ID;

        if (!apiKey || !searchEngineId) {
            console.error('Missing required environment variables');
            return NextResponse.json(
                { error: 'Server configuration error' },
                { status: 500 }
            );
        }

        // Calculate start index for pagination (Google API uses 1-based indexing)
        const startIndex = (parseInt(page) - 1) * 10 + 1;

        // Build Google Custom Search API URL
        const googleApiUrl = new URL('https://www.googleapis.com/customsearch/v1');
        googleApiUrl.searchParams.append('key', apiKey);
        googleApiUrl.searchParams.append('cx', searchEngineId);
        googleApiUrl.searchParams.append('q', query.trim());
        googleApiUrl.searchParams.append('searchType', 'image');
        googleApiUrl.searchParams.append('num', '10'); // Max 10 results per request
        googleApiUrl.searchParams.append('start', startIndex.toString());
        googleApiUrl.searchParams.append('safe', 'active'); // Safe search
        googleApiUrl.searchParams.append('imgSize', 'large'); // Prefer medium sized images
        googleApiUrl.searchParams.append('imgType', 'photo'); // Prefer photos over clipart

        // Make request to Google Custom Search API
        const response = await fetch(googleApiUrl.toString(), {
            headers: {
                'User-Agent': 'ImageSearchApp/1.0',
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Google API Error:', response.status, errorText);

            if (response.status === 403) {
                return NextResponse.json(
                    { error: 'API quota exceeded or invalid credentials' },
                    { status: 403 }
                );
            }

            return NextResponse.json(
                { error: 'Failed to fetch search results' },
                { status: 500 }
            );
        }

        const data = await response.json();

        // Transform the Google API response to a cleaner format
        const transformedResults = {
            query: query.trim(),
            totalResults: parseInt(data.searchInformation?.totalResults || '0'),
            currentPage: parseInt(page),
            itemsPerPage: 10,
            images: data.items?.map((item: any, index: number) => ({
                id: `${page}-${index + 1}`,
                title: item.title || 'Untitled',
                url: item.link,
                thumbnail: item.image?.thumbnailLink || item.link,
                thumbnailWidth: item.image?.thumbnailWidth || 150,
                thumbnailHeight: item.image?.thumbnailHeight || 150,
                contextUrl: item.image?.contextLink || item.displayLink,
                source: item.displayLink || 'Unknown source',
                width: item.image?.width,
                height: item.image?.height,
                size: item.image?.byteSize,
                snippet: item.snippet || ''
            })) || [],
            hasNextPage: data.queries?.nextPage?.length > 0,
            nextPage: data.queries?.nextPage?.[0]?.startIndex ?
                Math.ceil(data.queries.nextPage[0].startIndex / 10) : null
        };

        // Add CORS headers for client-side requests
        const headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Content-Type',
        };

        return NextResponse.json(transformedResults, { headers });

    } catch (error) {
        console.error('API Route Error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// Handle CORS preflight requests
export async function OPTIONS(request: Request) {
    return new Response(null, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
    });
}