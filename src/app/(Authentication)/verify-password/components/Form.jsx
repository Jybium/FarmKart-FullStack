"use client"


import React, {useRef, useState} from 'react'

const Form = () => {

    const [inputValues, setInputValues] = useState({
      field1: "",
      field2: "",
      field3: "",
      field4: "",
      field5: "",
      field6: "",
      // Add more fields as needed
    });

    const inputRefs = {
      field1: useRef(null),
      field2: useRef(null),
      field3: useRef(null),
      field4: useRef(null),
      field5: useRef(null),
      field6: useRef(null),
      // Add more refs as needed
    };

    const handleInputChange = (fieldName) => (event) => {
      setInputValues((prevValues) => ({
        ...prevValues,
        [fieldName]: event.target.value,
      }));

      // Focus on the next input field if it exists
      const nextField = getNextField(fieldName);
      if (nextField) {
        inputRefs[nextField].current.focus();
      }
    };

    const getNextField = (currentField) => {
      const fields = Object.keys(inputRefs);
      const currentIndex = fields.indexOf(currentField);

      return currentIndex < fields.length - 1 ? fields[currentIndex + 1] : null;
    };


  return (
    <div className="grid grid-flow-col justify-center gap-2 w-8/12 m-auto my-10">
      <input
        type="tel"
        maxLength={1}
        required
        value={inputValues.field1}
        onChange={handleInputChange("field1")}
        ref={inputRefs.field1}
        className="text-center rounded w-[50px] h-[50px] sm:w-[70px] sm:h-[70px]"
      />

      <input
        type="tel"
        value={inputValues.field2}
        maxLength={1}
        required
        onChange={handleInputChange("field2")}
        ref={inputRefs.field2}
        className="text-center rounded  w-[50px] h-[50px] sm:w-[70px] sm:h-[70px]"
      />

      <input
        type="tel"
        value={inputValues.field3}
        maxLength={1}
        required
        onChange={handleInputChange("field3")}
        ref={inputRefs.field3}
        className="text-center rounded w-[50px] h-[50px] sm:w-[70px] sm:h-[70px]"
      />

      <input
        type="tel"
        value={inputValues.field4}
        required
        maxLength={1}
        onChange={handleInputChange("field4")}
        ref={inputRefs.field4}
        className="text-center rounded w-[50px] h-[50px] sm:w-[70px] sm:h-[70px]"
      />

      <input
        type="tel"
        value={inputValues.field5}
        required
        maxLength={1}
        onChange={handleInputChange("field5")}
        ref={inputRefs.field5}
        className="text-center rounded w-[50px] h-[50px] sm:w-[70px] sm:h-[70px]"
      />

      <input
        type="tel"
        required
        maxLength={1}
        value={inputValues.field6}
        onChange={handleInputChange("field6")}
        ref={inputRefs.field6}
        className="text-center rounded w-[50px] h-[50px] sm:w-[70px] sm:h-[70px]"
      />

      {/* Add more input fields as needed */}
    </div>
  );
}

export default Form