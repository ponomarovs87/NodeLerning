export const errFunc = (res, err, text) => {
  console.log(err);
  return res.status(500).json({ message: text, error: err });
};
