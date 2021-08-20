export type CogScrollPayload = {
  delta_y: number;
};

export type TrackSummary = {
  "switch-id": string, 
  offset: string,
  height: string
}

export type TrackSummaryList = TrackSummary[];

export type AnchorCoordinates = {
  x: number;
  y: number;
};

export enum Markup {
  STRONG = "strong",
  EMPHASIS = "emphasis",
  FOCUS = "focus",
  LIGHT = "light",
}

export type ZmenuContentItem = {
  text: string;
  markup: Markup[];
};

export type ZmenuContentBlock = ZmenuContentItem[];

export type ZmenuContentLine = ZmenuContentBlock[];

export type ZmenuContentFeature = {
  id: string;
  track_id: string;
  lines: ZmenuContentLine[];
};

export type PositionUpdatePayload = {
  stick: string
  start: number
  end: number
}

export enum OutgoingActionType {
  PING = 'ping',
  ACTIVATE_BROWSER = 'activate_browser',
  MOVE_DOWN = 'move_down',
  MOVE_LEFT = 'move_left',
  MOVE_RIGHT = 'move_right',
  MOVE_UP = 'move_up',
  SET_FOCUS = 'set_focus',
  SET_FOCUS_LOCATION = 'set_focus_location',
  TOGGLE_TRACKS = 'toggle_tracks',
  TURN_ON_TRACKS = 'turn_on_tracks',
  TURN_OFF_TRACKS = 'turn_off_tracks',
  TURN_ON_LABELS = 'turn_on_labels',
  TURN_OFF_LABELS = 'turn_off_labels',
  ZMENU_ACTIVITY_OUTSIDE = 'zmenu-activity-outside', // TODO: sometime later, unify underscores vs hyphens (together with Genome Browser)
  ZMENU_ENTER = 'zmenu-enter',
  ZMENU_LEAVE = 'zmenu-leave',
  ZOOM_IN = 'zoom_in',
  ZOOM_OUT = 'zoom_out'
}

export enum IncomingActionType {
  GENOME_BROWSER_READY = 'genome_browser_ready',
  CURRENT_POSITION = 'current_position',
  TARGET_POSITION = 'target_position',
  SCROLL_POSITION = 'scroll_position',
  TRACK_SUMMARY = 'track_summary',
  ZMENU_CREATE = 'create_zmenu',
  ZMENU_DESTROY = 'destroy_zmenu',
  ZMENU_REPOSITION = 'update_zmenu_position'
}

export type GenomeBrowserReadyAction = {
  type: IncomingActionType.GENOME_BROWSER_READY;
  payload: never;
};

export type BrowserCurrentLocationUpdateAction = {
  type: IncomingActionType.CURRENT_POSITION;
  payload: PositionUpdatePayload
};

export type BrowserTargetLocationUpdateAction = {
  type: IncomingActionType.TARGET_POSITION;
  payload: PositionUpdatePayload
};

export type UpdateCogPositionAction = {
  type: IncomingActionType.SCROLL_POSITION;
  payload: CogScrollPayload;
};

export type UpdateCogTrackPositionAction = {
  type: IncomingActionType.TRACK_SUMMARY;
  payload: TrackSummaryList;
};

export type ZmenuCreateAction = {
  type: IncomingActionType.ZMENU_CREATE;
  payload: {
    id: string;
    anchor_coordinates: AnchorCoordinates;
    content: ZmenuContentFeature[];
  };
};

export type ZmenuDestroyAction = {
  type: IncomingActionType.ZMENU_DESTROY;
  payload: { id: string };
};

export type ZmenuRepositionAction = {
  type: IncomingActionType.ZMENU_REPOSITION;
  payload: {
    id: string;
    anchor_coordinates: {
      x: number;
      y: number;
    };
  };
};

export type BrowserToggleTracksAction = {
  type: OutgoingActionType.TOGGLE_TRACKS;
  payload: {
    on?: string | string[];
    off?: string | string[];
  };
};

export type TurnOnTracksAction = {
  type: OutgoingActionType.TURN_ON_TRACKS;
  payload: {
    track_ids: string[];
  };
};

export type TurnOffTracksAction = {
  type: OutgoingActionType.TURN_OFF_TRACKS;
  payload: {
    track_ids: string[];
  };
};

export type TurnOnLabelsAction = {
  type: OutgoingActionType.TURN_ON_LABELS;
  payload: {
    track_ids: string[];
  };
};

export type TurnOffLabelsAction = {
  type: OutgoingActionType.TURN_OFF_LABELS;
  payload: {
    track_ids: string[];
  };
};

export type BrowserSetFocusAction = {
  type: OutgoingActionType.SET_FOCUS;
  payload: {
    focus?: string | undefined;
  };
};

export type BrowserSetFocusLocationAction = {
  type: OutgoingActionType.SET_FOCUS_LOCATION;
  payload: {
    endBp: number;
    startBp: number;
    stick: string;
  };
};

export type ActivateBrowserAction = {
  type: OutgoingActionType.ACTIVATE_BROWSER;
};

export type ZmenuEnterAction = {
  type: OutgoingActionType.ZMENU_ENTER;
  payload: {
    id: string;
  };
};

export type ZmenuOutsideActivityAction = {
  type: OutgoingActionType.ZMENU_ACTIVITY_OUTSIDE;
  payload: {
    id: string;
  };
};

export type ZmenuLeaveAction = {
  type: OutgoingActionType.ZMENU_LEAVE;
  payload: {
    id: string;
  };
};

export type MoveUpAction = {
  type: OutgoingActionType.MOVE_UP;
  payload: { move_up_px: number };
};

export type MoveDownAction = {
  type: OutgoingActionType.MOVE_DOWN;
  payload: { move_down_px: number };
};

export type MoveLeftAction = {
  type: OutgoingActionType.MOVE_LEFT;
  payload: { move_left_px: number };
};

export type MoveRightAction = {
  type: OutgoingActionType.MOVE_RIGHT;
  payload: { move_right_px: number };
};

export type ZoomInAction = {
  type: OutgoingActionType.ZOOM_IN;
  payload: { zoom_by: number };
};

export type ZoomOutAction = {
  type: OutgoingActionType.ZOOM_OUT;
  payload: { zoom_by: number };
};

export type PingAction = {
  type: OutgoingActionType.PING;
};

export type OutgoingAction =
  | PingAction
  | ActivateBrowserAction
  | BrowserToggleTracksAction
  | TurnOnTracksAction
  | TurnOffTracksAction
  | TurnOnLabelsAction
  | TurnOffLabelsAction
  | ZmenuEnterAction
  | ZmenuLeaveAction
  | ZmenuOutsideActivityAction
  | BrowserSetFocusLocationAction
  | BrowserSetFocusAction
  | MoveUpAction
  | MoveDownAction
  | MoveLeftAction
  | MoveRightAction
  | ZoomInAction
  | ZoomOutAction;

export type IncomingAction =
  | GenomeBrowserReadyAction
  | BrowserCurrentLocationUpdateAction
  | BrowserTargetLocationUpdateAction
  | UpdateCogPositionAction
  | UpdateCogTrackPositionAction
  | ZmenuCreateAction
  | ZmenuDestroyAction
  | ZmenuRepositionAction;

export const createOutgoingAction = (action: OutgoingAction) => {
  return { ...action };
};
