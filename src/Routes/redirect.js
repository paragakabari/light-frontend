const host = window.location.hostname;

const localRedirects = "http://localhost:3000/";

const stagingRedirects = "https://stage-accounts.vustudio.network/";

const prodRedirects = "https://accounts.vustudio.network/";

const tempRediercts = {
  "accounts.vustudio.network": prodRedirects,
  "stage-accounts.vustudio.network": stagingRedirects,
  "staging-revu.vustudio.network": stagingRedirects,
  "revu.vustudio.network": prodRedirects,
  "stage-vsn.vustudio.network": stagingRedirects,
  "vsn.vustudio.network": prodRedirects,
  "stage.studio-automation-revu.vustudio.network": stagingRedirects,
  "studio-automation-revu.vustudio.network": prodRedirects,
  localhost: localRedirects,
};

export const redirects = tempRediercts[host] || stagingRedirects;
