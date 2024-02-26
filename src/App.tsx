import { useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

interface Icountries {
  color: "default" | "primary" | "secondary";
  label: string;
  value: string;
  checked: boolean;
}

const countriesArr: Icountries[] = [
  { color: "default", label: "Select All", value: "selectAll", checked: false },
  { color: "default", label: "India", value: "india", checked: false },
  { color: "default", label: "USA", value: "usa", checked: false },
  { color: "default", label: "France", value: "france", checked: false },
];

export default function CheckboxLabels() {
  const [countries, setCountries] = useState<Icountries[]>(countriesArr);
  const handleCountries = (event: React.SyntheticEvent) => {
    const clickValue = (event.target as HTMLInputElement).value;
    if (clickValue === "selectAll") {
      setCountries((prevState: Icountries[]) => {
        if (prevState[0].checked) {
          return prevState.map((country) => {
            let copyCountry = Object.assign({}, country);
            copyCountry.checked = false;
            return copyCountry;
          });
        } else {
          return prevState.map((country) => {
            let copyCountry = Object.assign({}, country);
            copyCountry.checked = true;
            return copyCountry;
          });
        }
      });
    } else {
      setCountries((prevState: Icountries[]) => {
        let countriesArrUp = prevState.map((country) => {
          if (clickValue === country.value) {
            country.checked = !country.checked;
          }
          if (country.value === "selectAll" && country.checked === false) {
            country.checked = false;
          }
          return country;
        });
        if (
          countriesArrUp
            .filter((e) => e.value !== "selectAll")
            .map((e) => e.checked)
            .includes(false)
        ) {
          countriesArrUp[0].checked = false;
        } else {
          countriesArrUp[0].checked = true;
        }
        return countriesArrUp;
      });
    }
  };

  return (
    <FormGroup>
      {countries &&
        countries.map((country) => {
          return (
            <FormControlLabel
              key={country.value}
              control={
                <Checkbox
                  color={country.color}
                  value={country.value}
                  checked={country.checked}
                  onClick={handleCountries}
                />
              }
              label={country.label}
            />
          );
        })}
    </FormGroup>
  );
}
