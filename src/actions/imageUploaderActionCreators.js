
export const imageUploaderActionCreators = {
  IMAGE_UPLOADER: {
    SHOW: {
      UPLOADER: payload => payload,
      EDITOR: payload => payload,
      UPLOADER_EDITOR: payload => payload,
    },
    UPDATE_SLIDER: payload => payload,
    HIDE: payload => payload,
  }
}
