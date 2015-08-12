db.batches.insert({
  id: 0,
  batch: [
    {
      "level": 0,
      "content": "'Hello ' + 'world!';",
      "timeLimit": 90
    }, {
      "level": 1,
      "content": "'a' < 'b';",
      "timeLimit": 90
    }, {
      "level": 2,
      "content": "'5' === 5;",
      "timeLimit": 90
    }, {
      "level": 3,
      "content": "null === undefined;",
      "timeLimit": 90
    }, {
      "level": 4,
      "content": "13 + !0;",
      "timeLimit": 90
    }, {
      "level": 5,
      "content": "'This is a string'.charAt(0);",
      "timeLimit": 90
    }, {
      "level": 6,
      "content": "'Hello world'.substring(0, 5);",
      "timeLimit": 90
    }, {
      "level": 7,
      "content": "'Hello'.length;",
      "timeLimit": 90
    }, {
      "level": 8,
      "content": "var someVar = 5;",
      "timeLimit": 90
    }, {
      "level": 9,
      "content": "someOtherVar = 10;",
      "timeLimit": 90
    }
  ]
});

db.batches.insert({
  id: 1,
  batch: [
    {
      "level": 10,
      "content": "var someThirdVar;",
      "timeLimit": 90
    }, {
      "level": 11,
      "content": "someVar += 5;",
      "timeLimit": 90
    }, {
      "level": 12,
      "content": "someVar *= 10;",
      "timeLimit": 90
    }, {
      "level": 13,
      "content": "someVar++;",
      "timeLimit": 90
    }, {
      "level": 14,
      "content": "someVar--;",
      "timeLimit": 90
    }, {
      "level": 15,
      "content": "var myArray = ['Hello', 45, true];",
      "timeLimit": 90
    }, {
      "level": 16,
      "content": "myArray[1];",
      "timeLimit": 90
    }, {
      "level": 17,
      "content": "myArray.push('World');",
      "timeLimit": 90
    }, {
      "level": 18,
      "content": "myArray.length;",
      "timeLimit": 90
    }, {
      "level": 19,
      "content": "myArray[3] = 'Hello';",
      "timeLimit": 90
    }
  ]
});

db.batches.insert({
  id: 3,
  batch: [
    {
      "level": 20,
      "content": "WAT",
      "timeLimit": 60
    }, {
      "level": 21,
      "content": "OMG",
      "timeLimit": 90
    }, {
      "level": 22,
      "content": "SHOOT ME",
      "timeLimit": 160
    }
  ]
});