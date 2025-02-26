import type EventEmitter from "events";
import type { EVENT_LIST } from "../constants";

export type TAevatarEventEmitter = {
  remove: () => void;
} & EventEmitter;

export type TEventName = (typeof EVENT_LIST)[number];

export type TAevatarEventsTypes = {
  [x in TEventName]: {
    emit: (...params: any[]) => void;
    addListener: (listener: (data: any) => void) => TAevatarEventEmitter;
    name: string;
  };
};
