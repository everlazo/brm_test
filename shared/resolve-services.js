export function resolve(success = false, message = "OK", data = null) {
    return {
      "success": success,
      "message": message,
      "data" : data
    }
}