import formidable from "formidable";

const configureIncomingForm = () => {
  const options = {
    multiples: true,
  };

  return formidable(options);
};

export default configureIncomingForm();
