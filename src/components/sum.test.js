const sum = require('./sum')

test('adds 1 + 2 to equal', () => {
  expect(sum(1,2)).toBe(3)
})

test('string convert to json', () => {
  const v = {value: "myv", label: "myv"}
  const str = 'myv'

  const jstr = '{"value":"'+ str +'"}'  //"value":" is a must!
  const jv = JSON.parse(jstr)

  expect(JSON.stringify(jv)).toBe(jstr)
  expect(JSON.stringify({value:"myv"})).toBe(jstr) // name can have ""
  
  const jstr1 = '{"value":"'+ str +'","label":"'+str+'"}'  //"value":" is a must!
  expect(JSON.stringify({value:"myv",label:"myv"})).toBe(jstr1) // name can have ""
  expect(JSON.stringify({value:str,label:str})).toBe(jstr1) 
})

