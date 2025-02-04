import { Request } from "express";

export interface RequestPayloadProps extends Request {
    email?: string;
}