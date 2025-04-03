// src/app.d.ts
declare global {
	namespace App {
	  interface PageData {
		projects?: {
		  name: string;
		  description: string | null;
		  url: string;
		  homepageUrl: string | null;
		  stargazerCount: number;
		  forkCount: number;
		  primaryLanguage: {
			name: string;
			color: string;
		  } | null;
		}[];
		error?: string;
	  }
	}
  }
  
  export {};