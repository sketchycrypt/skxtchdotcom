import { env } from '$env/dynamic/private';
const { TOKEN } = env

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch }) {
    try {
        const username = 'sketchycrypt';
        const response = await fetch(`https://api.github.com/graphql`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `{
                    user(login: "${username}") {
                        pinnedItems(first: 6, types: REPOSITORY) {
                            nodes {
                                ... on Repository {
                                    name
                                    description
                                    url
                                    homepageUrl
                                    stargazerCount
                                    forkCount
                                    primaryLanguage {
                                        name
                                        color
                                    }
                                }
                            }
                        }
                    }
                }`
            })
        });

        if (!response.ok) throw new Error('Failed to fetch GitHub data');

        const { data, errors } = await response.json();
        
        if (errors) throw new Error(errors[0].message);

        return {
            projects: data.user?.pinnedItems?.nodes || []
        };
    } catch (error) {
        return {
            projects: [],
            // @ts-ignore
            error: error.message
        };
    }
}