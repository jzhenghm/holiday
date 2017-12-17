import React from 'react';
import 'react-day-picker/lib/style.css';
import Select from "react-select"

const currentYear = new Date().getFullYear();
const fromMonth = new Date(currentYear, 0);
const toMonth = new Date(currentYear + 10, 11);

// Component will receive date, locale and localeUtils props
const YearMonthForm = ({ date, localeUtils, onChange }) => {
  const months = localeUtils.getMonths();
  console.log(months)
  console.log("date:"+date.getMonth())

  const monthsOptions = months.map((m, i) => {
  // const jstr1 = '{"value":'+ i +',"label":"'+m+'"}'
   return JSON.parse('{"value":'+ i +',"label":"'+m+'"}')
  })
 console.log(monthsOptions)

  const years = [];
  for (let i = fromMonth.getFullYear(); i <= toMonth.getFullYear(); i += 1) {
    years.push(i);
  }

  const yearsOptions = years.map((y) => {
    return JSON.parse('{"value":'+ y +',"label":"'+ y +'"}')
  })

  const handleChange = (e) => {
    const { year, month } = e.target.form;
    onChange(new Date(year.value, month.value));
  };

  // const handleChange1 = (e) => {
  //   console.log('month:'+ e.value)
  //   const { year, month1 } = e.target.form;
  //   onChange(new Date(year.value, month1.value));   
  // }

  return (
    
    <form className="DayPicker-Caption">   
        {/* <Select
        style={{width: '90px'}}
          name="month"
          options={monthsOptions}
          onChange={handleChange}
          value={date.getMonth()}                                                                                      
          clearable={false}
        /> */}
      
      <select style={{borderRadius: '4px', border: '1px solid #ccc'}} name="month" onChange={handleChange} value={date.getMonth()}>
        {months.map((month, i) => <option key={i} value={i}>{month}</option>)}
      </select> 
      <select style={{borderRadius: '4px', border: '1px solid #ccc'}} name="year" onChange={handleChange} value={date.getFullYear()}>
        {years.map((year, i) =>
          <option key={i} value={year}>
            {year}
          </option>
        )}
      </select>  
     
      {/* <div style={{width: '55px'}}>
        <Select
          name="year"
          options={yearsOptions}
          onChange={handleChange}
          value={date.getFullYear()}                                                                                      
          clearable={false}
        />
      </div> */}

      {/* <select name="year" onChange={handleChange} value={date.getFullYear()}>
        {years.map((year, i) =>
          <option key={i} value={year}>
            {year}
          </option>
        )}
      </select> */}
    </form>
   
  );
}

export default YearMonthForm
