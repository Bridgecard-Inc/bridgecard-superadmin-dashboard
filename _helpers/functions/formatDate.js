import moment from "moment"

export const formatEpoch = (epoch) => {
  return moment.unix(epoch).format("MMM Do YYYY")
}
