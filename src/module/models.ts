interface IDimensions {
  depth: number
  height: number
  width: number
}

interface IImages {
  [index: number]: string
}

interface IMeta {
  barcode: string
  createdAt: string
  qrCode: string
  updatedAt: string
}

interface IReview {
  comment: string
  date: string
  rating: number
  reviewerEmail: string
  reviewerName: string
}

interface ITags {
  [index: number]: string
}

export default interface IProducts {
  availabilityStatus: string
  brand: string
  category: string
  description: string
  dimensions: IDimensions
  discountPercentage: number
  id: number
  images: IImages
  meta: IMeta
  minimumOrderQuantity: number
  price: number
  rating: number
  returnPolicy: string
  reviews: IReview[]
  shippingInformation: string
  sku: string
  stock: number
  tags: ITags
  thumbnail: string
  title: string
  warrantyInformation: string
  weight: number
}

export default interface Idata {
  limit: number
  products: IProducts[]
  skip: number
  total: number
}
