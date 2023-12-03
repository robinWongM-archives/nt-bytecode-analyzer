const magicNumber = 0xC0DE05DF;
const kPayloadLengthOffset = 4;

export class ByteCode {
  constructor(public readonly code: Buffer) {
    const header = this.getMagicNumber();
    if (header !== magicNumber) {
      throw new Error(`Invalid bytecode header: ${header.toString(16)}`);
    }
  }

  getMagicNumber(): number {
    // return the first 4 bytes as hex string
    return this.code.readUint32LE(0);
  }

  // https://github.com/v8/v8/blob/181f556032737223b6e43a48b81943b2f990daa8/src/snapshot/code-serializer.cc#L667
  getHeader() {
    return {
      magicNumber: this.getMagicNumber(),
      versionHash: this.code.readUint32LE(4),
      sourceHash: this.code.readUint32LE(8),
      flagHash: this.code.readUint32LE(12),
      payloadLength: this.code.readUint32LE(16),
      checksum: this.code.readUint32LE(20),
    };
  }
}