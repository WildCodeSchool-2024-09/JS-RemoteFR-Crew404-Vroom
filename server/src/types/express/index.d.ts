// to make the file a module and avoid the TypeScript error
export type {};

declare global {
  namespace Express {
    export interface Request {
      /* ************************************************************************* */
      // Add your custom properties here, for example:
      //
      // user?: { ... }
      /* ************************************************************************* */

      user?: {
        id: number;
        email: string;
        password: string;
      };

      event?: {
        id: number;
        title: string;
        event_picture: string | null;
        type:
          | "salon"
          | "course"
          | "musée"
          | "vente aux enchères"
          | "roadtrip"
          | "rassemblement";
        date_start: string;
        date_end: string;
        location: {
          x: number;
          y: number;
        };
        address: string;
        description: string;
        link: string | null;
        user_id: number;
      };
    }
  }
}
