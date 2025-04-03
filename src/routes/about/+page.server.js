export async function load({ url }) {
  if (url.pathname === "/about") {
      const username = "sketchycrypt";
      const res = await fetch(`https://api.github.com/users/${username}`);
      const data = await res.json();

      return {
          avatarUrl: data.avatar_url
      };
  }

  return {};
}
