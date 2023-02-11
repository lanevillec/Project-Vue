exports.handler = (event, context, callback) => {
    const response = {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({ message: "Hello, World2!" })
    };
    callback(null, response);
  };
  