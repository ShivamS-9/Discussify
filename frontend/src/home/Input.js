import { IconButton, InputAdornment } from "@mui/material";
import React from "react";


const Input = ({
  placeholder,
  name,
  label,
  autoFocus,
  type,
  handleChange,
  handleShowPassword,
}) => {
  return (
    <div class="container text-center">
      <div class="row">
        <input
          name={name}
          onChange={handleChange}
          variant="outlined"
          required
          fullWidth
          label={label}
          autoFocus={autoFocus}
          type={type}
          placeholder={placeholder}
          // inputprops={
          //   name === "password"
          //     ? {
          //         endAdornment: (
          //           <InputAdornment position="end">
          //             <IconButton onClick={handleShowPassword}>
          //               {type === "password" ? (
          //                 <VisibilityIcon />
          //               ) : (
          //                 <VisibilityOffIcon />
          //               )}
          //             </IconButton>
          //           </InputAdornment>
          //         ),
          //       }
          //     : null
          // }
        />
      </div>
    </div>
  );
};

export default Input;
