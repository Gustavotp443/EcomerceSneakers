import { type Request, type Response } from 'express'

class HomeController {
  public async index (req: Request, res: Response): Promise<Response> {
    return res.status(200).json({
      success: true,
      message:"Welcome to Home Page of Sneakers Ecomerce"
    })
  }
}

export default new HomeController()
