import { Request, Response } from "express";
import eventService from "../services/event.service";

class EventController {

  async create(req: Request, res: Response) {
    try {

      const {
        title,
        description,
        location,
        coverImage,
        startDate,
        endDate,
        published,
      } = req.body;

      const event = await eventService.create({
        title,
        description,
        location,
        coverImage,
        startDate: new Date(startDate),
        endDate: endDate
          ? new Date(endDate)
          : undefined,
        published,
      });

      return res.status(201).json(event);

    } catch (error) {

      console.error(error);

      return res.status(500).json({
        message: "Error creating event",
      });

    }
  }

  async list(req: Request, res: Response) {
    const events = await eventService.list();

    return res.json(events);
  }

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      const {
        startDate,
        endDate,
        ...rest
      } = req.body;

      const event = await eventService.update(id, {
        ...rest,

        startDate: startDate
          ? new Date(startDate)
          : undefined,

        endDate: endDate
          ? new Date(endDate)
          : undefined,
      });

      return res.json(event);

    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: "Error updating event",
      });
    }
  }

  async delete(req: Request, res: Response) {
    const id = Number(req.params.id);

    await eventService.delete(id);

    return res.json({
      message: "Event deleted",
    });
  }
}

export default new EventController();