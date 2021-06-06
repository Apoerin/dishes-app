const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Required";
    }
    if (!values.preparation_time) {
      errors.preparation_time = "Required";
    }
    if (!values.type) {
      errors.type = "Required";
    }
    if (values.type === "pizza") {
      if (!values.no_of_slices && !values.diameter) {
        errors.no_of_slices = "Required";
        errors.diameter = "Required";
      }
    } else if (values.type === "soup") {
      if (!values.spiciness_scale) {
        errors.spiciness_scale = "Required";
      }
    } else if (values.type === "sandwich") {
      if (!values.slices_of_bread) {
        errors.slices_of_bread = "Required";
      }
    }
    return errors;
  };
  
  export default validate;