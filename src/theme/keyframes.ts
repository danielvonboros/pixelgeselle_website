import { keyframes } from "@emotion/react";
import { effects } from "./tokens";

export const rise = keyframes`
  from { opacity: 0; transform: translate3d(0, 110%, 0); }
  to { opacity: 1; transform: none; }
`;

export const fadeUp = keyframes`
  from { opacity: 0; transform: translate3d(0, 16px, 0); }
  to { opacity: 1; transform: none; }
`;

export const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const drop = keyframes`
  0% { opacity: 0; transform: translate3d(0, -1.4em, 0); }
  60% { opacity: 1; transform: translate3d(0, 0.08em, 0); }
  80% { transform: translate3d(0, -0.04em, 0); }
  100% { opacity: 1; transform: none; }
`;

export const hop = keyframes`
  0% { transform: none; }
  40% { transform: translate3d(0, -8px, 0); }
  100% { transform: none; }
`;

export const pop = keyframes`
  0% { opacity: 0; transform: scale(0); }
  60% { opacity: 1; transform: scale(1.25); }
  100% { opacity: 1; transform: none; }
`;

export const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 ${effects.pulse}; }
  70% { box-shadow: 0 0 0 8px ${effects.pulseFade}; }
  100% { box-shadow: 0 0 0 0 ${effects.pulseFade}; }
`;
