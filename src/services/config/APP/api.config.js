const protocol = "http";
// const host = "localhost:3002";
const host = "13.202.5.33:3002";
// http://13.202.5.33:3002/api/v1
// const protocol = "http";
// const host = "3.144.154.237";

// const protocol = "http";
// const host = "192.168.29.127:4004";

const hostUrl = `${protocol}://${host}/api/v1/`;
const hostUrlForSocket = `${protocol}://${host}/`;

export const API = {
    protocol: protocol,
    host: host,
    hostUrl: hostUrl,
    hostUrlForSocket: hostUrlForSocket,
};
