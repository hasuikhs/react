import React from 'react';
import styled from 'styled-components';

import { InfoIcon } from '@/assets/icons/Icons';
import { numToPx, textToHtml } from '../utils/utils';

const StyledTooltipContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  width: 100%;
  height: 100%;

  &:hover .tooltip {
    visibility: visible;
    opacity: 1;
    transform: translate(
      ${ props => props.left ? `${ props.left }px` : (props.right ? `${ props.right }px` : '0px') },
      ${ props => props.bottom ? `${ props.bottom }px` : (props.top ? `${ props.top }px` : '0px') }
    );
  }
  `;

const StyledTooltip = styled.span`
  position: absolute;
  visibility: hidden;
  opacity: 0;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 1px 1px 4px 1px rgba(0, 0, 0, 0.2);
  background-color: ${ props => props.backgroundColor || '#FFF' };
  width: fit-content;
  height: fit-content;
  font-size: 12px;
  z-index: 504;
  max-width: 230px;
  max-height: 130px;
  transition: 0.3s ease;
  transform: translate(0, 0);
  pointer-events: none;

  &.left::before, &.right::after {
    content: "";
    position: absolute;
    top: 50%;
    border-width: 8px;
    border-style: solid;
    transform: translateY(-50%);
  }

  &.left::before {
    left: -13px;
    border-color: transparent ${ props => props.backgroundColor || '#FFF' } transparent transparent;
  }

  &.right::after {
    right: -13px;
    border-color: transparent transparent transparent ${ props => props.backgroundColor || '#FFF' };
  }
`;

const StyledTooltipText = styled.div`
  white-space: nowrap;
`;

const StyledInfoText = styled.span`
  display: flex;
  align-items: center;
  width: max-content;
`;

const StyledBasicText = styled.div`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 6;
  overflow: hidden;
  word-break: keep-all;
  line-break: anywhere;
  line-height: 20px;
  font-weight: normal;
`;

const TooltipContent = ({ type, text }) => {
  switch (type) {
    case 'info':
      return (
        <StyledInfoText className="info_text">
          <InfoIcon color="#FAAD14" width="20px" height="16px" />
          <span>{ textToHtml(text) }</span>
        </StyledInfoText>
      );
    case 'tooltip':
      return (
        <StyledTooltipText className="tooltip_text">
          { textToHtml(text) }
        </StyledTooltipText>
      );
    default:
      return (
        <StyledBasicText>
          { text }
        </StyledBasicText>
      );
  }
};

const Tooltip = ({ children, type = '', text = '', tail = '', left, bottom, top, right, tooltipStyle }) => (
  <StyledTooltipContainer
    className="tooltip_container"
    left={ left } right={ right } bottom={ tail ? '' : bottom } top={ tail ? '' : top }
  >
    { children }
    <StyledTooltip
      className={ `tooltip ${ tail }` }
      backgroundColor={ tooltipStyle && tooltipStyle.backgroundColor ? tooltipStyle.backgroundColor : undefined }
      style={{ ...tooltipStyle, left: numToPx(left), bottom: numToPx(bottom), top: numToPx(top), right: numToPx(-right) }}
    >
      <TooltipContent type={ type } text={ text } />
    </StyledTooltip>
  </StyledTooltipContainer>
);

export default Tooltip;
