import * as moment from 'moment'

const IQUANT_ENDPOINT = 'http://localhost/api/iquant/rest?';

class IquantHoliday {
  xmlToString = (xml_str) => {
    // take xml string out
    const resp_start = xml_str.indexOf("<response");
    const id0_s = xml_str.indexOf("<", resp_start + 1); 
    const resp_end = xml_str.indexOf("</response>");
    const resp_len = resp_end - (id0_s);
    const holidayStr = xml_str.substr(id0_s, resp_len);
    // xml string to array
    const rawStrs = holidayStr.split("\n").filter(s => s.length > 8);  // acturally should be more than 20 chars.
    const values = rawStrs.map(s => { 
      const s_start = s.indexOf("<");
      const r = s.substr(s_start + 6, 8);
      console.log(s+" "+s_start+" "+r);
      return r;
    }).sort()
    return values
  }

  // convert string 'YYYYMMDD' to date object
  stringToDate = (values) => {
    const dates = values.map(v => {
      const y = v.substring(0, 4) // not working with subStr!!!
      const m = v.substring(4, 6)
      const d = v.substring(6, 8)
   //   console.log('yyyy:'+ y +' mm:'+ m + ' dd '+d);      
      const date = new Date(y, m - 1, d);  
      return date   
    })
    console.debug(dates)
    return dates
  };

  queryString = (params) => {
    const esc = encodeURIComponent;
    const query = Object.keys(params)
      .map(k => esc(k) + '=' + esc(params[k])).join('&');
    return query;
  };
  
  // get Holidays for the year of the date
  async getHolidays(date, currency, tradeType) {
    const year = date.getYear() + 1900;
    console.log('date:'+ date.getYear()+'0101');

    const dateRange = year +'0101,'+ year +'1231';
    console.log('dateRange'+dateRange);
    const params = {
      action: 'holiday',
      operation: 'list',
      date: `${dateRange}`,
      currency: `${currency}`,
      type: `${tradeType}`
    };

    const url = `${IQUANT_ENDPOINT}` + this.queryString(params);
   
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/text'
      }    
    });

    if (!response.ok) {
      throw new Error(`Iquant service getHolidays failed, HTTP status ${response.status}`);
    };

    const xml_str = await response.text();
    const dateStrings = this.xmlToString(xml_str);
    const dates = this.stringToDate(dateStrings);
    return dates //dateStrings
  }


  async updateHolidays(deleteDays, addDays, currency, tradeType) {
    const delDayStrs = deleteDays.map (d => { 
      const str = '-'+moment(d).format('YYYYMMDD');
      return str });
    console.log('delDayStrs:'+delDayStrs);
    const addDayStrs = addDays.map(d => moment(d).format('YYYYMMDD'));
    console.log('addDayStrs:'+addDays);
    const allDays = delDayStrs.concat(addDayStrs);
    const dates = allDays.join();
    console.log('dates:'+dates);
    const params = {
      action: 'holiday',
      operation: 'update',
      date: `${dates}`,
      currency: `${currency}`,
      type: `${tradeType}`
    };

    const url = `${IQUANT_ENDPOINT}` + this.queryString(params);
    console.log('updateHoliday URL:'+url);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/text'
      }    
    });

    const xml_str = await response.text();

    console.log('response:' + xml_str);

    if (!response.ok) {
      throw new Error(`Iquant service updateHolidays failed, HTTP status ${response.status}`);
    } else {
      return true
    }
  }
}

export default new IquantHoliday();