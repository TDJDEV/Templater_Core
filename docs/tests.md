# Tests

exported files format => {
  name: 'export key',
  path: 'path/to/module'
  process(fn, params, expected){}, // testings processes
  tests:[ // array of tests
    {
      name: "", // test description
      params: [], // parameters
      expected: [] // expected result
    }
  ]
}