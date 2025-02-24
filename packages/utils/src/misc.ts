import AElf from "aelf-sdk";
export const sleep = (time: number) => {
  return new Promise<void>((resolve) => {
    const timeout = setTimeout(() => {
      clearTimeout(timeout);
      resolve();
    }, time);
  });
};

export const pubKeyToAddress = (pubKey: string) => {
  const onceSHAResult = Buffer.from(
    AElf.utils.sha256(Buffer.from(pubKey, "hex")),
    "hex"
  );
  const hash = AElf.utils.sha256(onceSHAResult).slice(0, 64);
  return AElf.utils.encodeAddressRep(hash);
};
