const host = window.location.hostname;

export const environmentTypes = {
  STAGING: "staging",
  PRODUCTION: "production",
};

export const getDomain = () => {
  switch (host) {
    case "localhost":
      return "localhost";
    case "dev-revu.vustudio.network":
    case "staging-revu.vustudio.network":
    case "revu.vustudio.network":
      return ".vustudio.network";
    case "stage-revu.devlopertesting.com":
    case "revu.devlopertesting.com":
      return ".devlopertesting.com";
    default:
      return ".vustudio.network";
  }
};

export const cookieOptions = {
  path: "/",
  domain: getDomain(),
};

export const getEnvironment = () => {
  switch (host) {
    case "localhost":
    case "dev-revu.vustudio.network":
    case "staging-revu.vustudio.network":
    case "stage-revu.devlopertesting.com":
      return environmentTypes.STAGING;
    case "revu.devlopertesting.com":
    case "revu.vustudio.network":
      return environmentTypes.PRODUCTION;

    default:
      return environmentTypes.STAGING;
  }
};
