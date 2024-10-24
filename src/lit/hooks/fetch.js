const url = "http://192.168.112.90:8000/data/post/1";

try {
  const resp = await fetch(url).then((response) => response.json());
  console.log("Fetch response: ", resp);
} catch (err) {
  console.log("failed to fetch rpc url", err);
}

export const fetchCode = `
(async (resp) => {
      console.log("Fetch response: ", resp.post.done);
  // this requests a signature share from the Lit Node
  // the signature share will be automatically returned in the HTTP response from the node
  // all the params (toSign, publicKey, sigName) are passed in from the LitJsSdk.executeJs() function
  const sigShare = await LitActions.signEcdsa({ toSign, publicKey, sigName });
})();
`;
