
export const imageUploaderActionCreators = {
  IMAGE_UPLOADER: {
    SHOW: {
      UPLOADER: payload => payload,
      EDITOR: payload => payload,
      UPLOADER_EDITOR: payload => payload,
    },
    UPDATE_SLIDER: payload => payload,
    HIDE: payload => payload,
    UPLOAD: {
      COUNT: payload => payload,
      DONE: payload => payload,
      INC: payload => payload,
      DEC: payload => payload,
    }
  }
}
