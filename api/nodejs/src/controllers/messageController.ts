import { Request, Response } from "express";
import { ValidationError } from "sequelize";

import { Message } from "../models/Message";
import { httpErrors, formatSequelizeErrorItems } from "../utils";

class MessageController {
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { id, name, email, age } = req.body;
      const message = await Message.create({ id, name, email, age });

      return res.status(201).json(message);
    } catch (error) {
      if (error instanceof ValidationError) {
        const errors = formatSequelizeErrorItems(error.errors);

        return res.status(400).json({
          error: {
            message: httpErrors.getMessage("MESSAGE_ERRORS"),
            error: errors
          }
        });
      }

      return res.status(500).json({
        error: {
          message: httpErrors.getMessage("MESSAGE_UNKNOWN_ERROR"),
          error: error
        }
      });
    }
  }

  public async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const message = await Message.findAll();

      if (message.length > 0) {
        return res.status(200).json(message);
      } else {
        return res.status(204).json(null);
      }

    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }

      return res.status(500).json({
        error: {
          message: httpErrors.getMessage("MESSAGE_UNKNOWN_ERROR")
        }
      });
    }
  }

  public async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { uuid } = req.params;
      const message = await Message.findByPk(uuid);

      if (!message) {
        return res.status(404).json({
          error: {
            message: httpErrors.getMessage("MESSAGE_NOT_FOUND")
          }
        });
      }

      return res.status(200).json(message);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }

      return res.status(500).json({
        error: {
          message: httpErrors.getMessage("MESSAGE_UNKNOWN_ERROR")
        }
      });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { uuid } = req.params;
      const { id, name, email, age } = req.body;

      const message = await Message.findByPk(uuid);

      if (!message) {
        return res.status(404).json({
          error: {
            message: httpErrors.getMessage("MESSAGE_NOT_FOUND")
          }
        });
      }

      await message.update({ id, name, email, age });
      return res.status(200).json(message);

    } catch (error) {
      if (error instanceof ValidationError) {
        const errors = formatSequelizeErrorItems(error.errors);

        return res.status(400).json({
          error: {
            message: httpErrors.getMessage("MESSAGE_ERRORS"),
            error: errors
          }
        });
      }

      return res.status(500).json({
        error: {
          message: httpErrors.getMessage("MESSAGE_UNKNOWN_ERROR")
        }
      });
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { uuid } = req.params;

      const message = await Message.findByPk(uuid);

      if (!message) {
        return res.status(404).json({
          error: {
            message: httpErrors.getMessage("MESSAGE_NOT_FOUND")
          }
        });
      }

      await message.destroy();
      return res.status(200).json({
        message: httpErrors.getMessage("MESSAGE_DELETED")
      });

    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }

      return res.status(500).json({
        error: {
          message: httpErrors.getMessage("MESSAGE_UNKNOWN_ERROR")
        }
      });
    }
  }
}

export default new MessageController();
