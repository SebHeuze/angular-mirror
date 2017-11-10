export default annyang;

declare const annyang: {
  addCommands: <T extends {}>(commands: T) => void,
  debug: (yn?: true) => void,
  start: () => void
};