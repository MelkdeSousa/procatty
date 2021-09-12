import ResponseView from '../view/ResponseView';

class Responses {
  static applicationError () {
    return new ResponseView(
      {
        message: "Some internal error, please try again later!",
        success: false
      }
    )
  }
}

export default Responses
