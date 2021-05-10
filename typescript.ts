type Test<D, M> = {
  data : D
  value : D & M
}

let test : Test<string, number> = {
  data : '문자열',
  value : null
}