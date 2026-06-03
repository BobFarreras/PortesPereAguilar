'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { DIMENSION_LIMITS } from '@/lib/constants/quoteOptions';

interface StepDimensionsProps {
  width: number;
  height: number;
  doorType: string | null;
  onWidthChange: (value: number) => void;
  onHeightChange: (value: number) => void;
}

function DoorDiagram({ width, height, doorType }: { width: number; height: number; doorType: string | null }) {
  const maxW = 260;
  const maxH = 200;
  const aspect = width / height;
  let w: number, h: number;
  if (aspect > maxW / maxH) {
    w = maxW;
    h = maxW / aspect;
  } else {
    h = maxH;
    w = maxH * aspect;
  }

  const panelCount = doorType === 'enrotllable'
    ? Math.max(6, Math.min(16, Math.round(h / 15)))
    : Math.max(2, Math.min(6, Math.round(h / 35)));

  return (
    <svg width={maxW + 20} height={maxH + 20} viewBox={`0 0 ${maxW + 20} ${maxH + 20}`} className="block mx-auto">
      <defs>
        <linearGradient id="doorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E34133" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#E34133" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="panelGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E34133" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#E34133" stopOpacity="0.12" />
        </linearGradient>
      </defs>

      {/* Marc de la porta */}
      <rect
        x={(maxW + 20 - w) / 2}
        y={(maxH + 20 - h) / 2}
        width={w}
        height={h}
        rx={2}
        fill="url(#doorGrad)"
        stroke="#E34133"
        strokeWidth={2}
      />

      {/* Porta Seccional - panells horitzontals */}
      {doorType === 'seccional' && Array.from({ length: panelCount }).map((_, i) => {
        const py = (maxH + 20 - h) / 2 + (h / panelCount) * i;
        const ph = h / panelCount;
        return (
          <g key={i}>
            <rect
              x={(maxW + 20 - w) / 2 + 2}
              y={py + 1}
              width={w - 4}
              height={ph - 2}
              rx={1}
              fill="url(#panelGrad)"
              stroke="#E34133"
              strokeWidth={0.5}
              strokeOpacity={0.3}
            />
            {/* Línia de panell */}
            {i < panelCount - 1 && (
              <line
                x1={(maxW + 20 - w) / 2 + 4}
                y1={py + ph}
                x2={(maxW + 20 - w) / 2 + w - 4}
                y2={py + ph}
                stroke="#E34133"
                strokeWidth={1}
                strokeOpacity={0.4}
              />
            )}
          </g>
        );
      })}

      {/* Porta Basculant - 2 fulles horitzontals (una a sobre de l'altra) */}
      {doorType === 'basculant' && (
        <g>
          {/* Fulla superior */}
          <rect
            x={(maxW + 20 - w) / 2 + 2}
            y={(maxH + 20 - h) / 2 + 2}
            width={w - 4}
            height={h / 2 - 3}
            rx={1}
            fill="url(#panelGrad)"
            stroke="#E34133"
            strokeWidth={0.5}
            strokeOpacity={0.3}
          />
          {/* Fulla inferior */}
          <rect
            x={(maxW + 20 - w) / 2 + 2}
            y={(maxH + 20 - h) / 2 + h / 2 + 1}
            width={w - 4}
            height={h / 2 - 3}
            rx={1}
            fill="url(#panelGrad)"
            stroke="#E34133"
            strokeWidth={0.5}
            strokeOpacity={0.3}
          />
          {/* Línia horizontal central */}
          <line
            x1={(maxW + 20 - w) / 2 + 4}
            y1={(maxH + 20) / 2}
            x2={(maxW + 20 - w) / 2 + w - 4}
            y2={(maxH + 20) / 2}
            stroke="#E34133"
            strokeWidth={1.5}
            strokeOpacity={0.5}
          />
          {/* Frontisses laterals */}
          <circle cx={(maxW + 20 - w) / 2 + 6} cy={(maxH + 20 - h) / 2 + h * 0.25} r={3} fill="#E34133" fillOpacity={0.4} />
          <circle cx={(maxW + 20 - w) / 2 + 6} cy={(maxH + 20 - h) / 2 + h * 0.75} r={3} fill="#E34133" fillOpacity={0.4} />
          <circle cx={(maxW + 20 - w) / 2 + w - 6} cy={(maxH + 20 - h) / 2 + h * 0.25} r={3} fill="#E34133" fillOpacity={0.4} />
          <circle cx={(maxW + 20 - w) / 2 + w - 6} cy={(maxH + 20 - h) / 2 + h * 0.75} r={3} fill="#E34133" fillOpacity={0.4} />
        </g>
      )}

      {/* Porta Corredissa - superfície rectangular + 2 rodes */}
      {doorType === 'corredissa' && (() => {
        const wheelSpacing = w / 6;
        const doorLeft = (maxW + 20 - w) / 2;
        const doorTop = (maxH + 20 - h) / 2;
        return (
          <g>
            {/* Panell principal */}
            <rect
              x={doorLeft + 2}
              y={doorTop + 2}
              width={w - 4}
              height={h - 4}
              rx={1}
              fill="url(#panelGrad)"
              stroke="#E34133"
              strokeWidth={0.5}
              strokeOpacity={0.3}
            />
            {/* Rail inferior */}
            <line
              x1={doorLeft}
              y1={doorTop + h - 1}
              x2={doorLeft + w}
              y2={doorTop + h - 1}
              stroke="#E34133"
              strokeWidth={2}
              strokeOpacity={0.4}
            />
            {/* Rodes - centres a cada extrem de l'espaiat (w/6) */}
            <circle
              cx={doorLeft + wheelSpacing}
              cy={doorTop + h + 5}
              r={5}
              fill="#E34133"
              fillOpacity={0.3}
              stroke="#E34133"
              strokeWidth={1}
              strokeOpacity={0.5}
            />
            <circle
              cx={doorLeft + w - wheelSpacing}
              cy={doorTop + h + 5}
              r={5}
              fill="#E34133"
              fillOpacity={0.3}
              stroke="#E34133"
              strokeWidth={1}
              strokeOpacity={0.5}
            />
            {/* Fletxa de direcció */}
            <path
              d={`M ${doorLeft + w * 0.85} ${(maxH + 20) / 2} l -12 -6 l 0 12 z`}
              fill="#E34133"
              fillOpacity={0.25}
            />
          </g>
        );
      })()}

      {/* Porta Practicable - batent amb frontisses */}
      {doorType === 'practicable' && (
        <g>
          <rect
            x={(maxW + 20 - w) / 2 + 2}
            y={(maxH + 20 - h) / 2 + 2}
            width={w - 4}
            height={h - 4}
            rx={1}
            fill="url(#panelGrad)"
            stroke="#E34133"
            strokeWidth={0.5}
            strokeOpacity={0.3}
          />
          {/* Línia central vertical */}
          <line
            x1={(maxW + 20) / 2}
            y1={(maxH + 20 - h) / 2 + 4}
            x2={(maxW + 20) / 2}
            y2={(maxH + 20 - h) / 2 + h - 4}
            stroke="#E34133"
            strokeWidth={1}
            strokeOpacity={0.4}
          />
          {/* Frontisses esquerra */}
          <circle cx={(maxW + 20 - w) / 2 + 6} cy={(maxH + 20) / 2 - h * 0.3} r={3} fill="#E34133" fillOpacity={0.5} />
          <circle cx={(maxW + 20 - w) / 2 + 6} cy={(maxH + 20) / 2} r={3} fill="#E34133" fillOpacity={0.5} />
          <circle cx={(maxW + 20 - w) / 2 + 6} cy={(maxH + 20) / 2 + h * 0.3} r={3} fill="#E34133" fillOpacity={0.5} />
          {/* Pany */}
          <rect
            x={(maxW + 20) / 2 + w * 0.05}
            y={(maxH + 20) / 2 - 4}
            width={6}
            height={8}
            rx={1}
            fill="#E34133"
            fillOpacity={0.5}
          />
        </g>
      )}

      {/* Porta Enrotllable - lamel·les horitzontals més fines */}
      {doorType === 'enrotllable' && (
        <g>
          {Array.from({ length: panelCount }).map((_, i) => {
            const py = (maxH + 20 - h) / 2 + (h / panelCount) * i;
            const ph = h / panelCount;
            return (
              <g key={i}>
                <rect
                  x={(maxW + 20 - w) / 2 + 2}
                  y={py + 1}
                  width={w - 4}
                  height={ph - 2}
                  rx={1}
                  fill="url(#panelGrad)"
                  stroke="#E34133"
                  strokeWidth={0.5}
                  strokeOpacity={0.3}
                />
              </g>
            );
          })}
          {/* Cilindre superior */}
          <rect
            x={(maxW + 20 - w) / 2}
            y={(maxH + 20 - h) / 2 - 8}
            width={w}
            height={8}
            rx={4}
            fill="#E34133"
            fillOpacity={0.2}
            stroke="#E34133"
            strokeWidth={1}
            strokeOpacity={0.3}
          />
          {/* Fletxa cap amunt */}
          <path
            d={`M ${(maxW + 20) / 2} ${(maxH + 20 - h) / 2 - 12} l -6 -8 l 12 0 z`}
            fill="#E34133"
            fillOpacity={0.3}
          />
        </g>
      )}

      {/* Sense porta seleccionada - quadre buit */}
      {!doorType && (
        <text
          x={(maxW + 20) / 2}
          y={(maxH + 20) / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#8A8F98"
          fontSize={11}
        >
          Selecciona una porta
        </text>
      )}
    </svg>
  );
}

export default function StepDimensions({ width, height, doorType, onWidthChange, onHeightChange }: StepDimensionsProps) {
  const t = useTranslations('quote.steps.dimensions');
  const [widthInput, setWidthInput] = useState(String(width));
  const [heightInput, setHeightInput] = useState(String(height));

  const handleWidthBlur = () => {
    const v = Number(widthInput);
    if (!isNaN(v) && v >= DIMENSION_LIMITS.width.min && v <= DIMENSION_LIMITS.width.max) {
      onWidthChange(v);
      setWidthInput(String(v));
    } else {
      setWidthInput(String(width));
    }
  };

  const handleHeightBlur = () => {
    const v = Number(heightInput);
    if (!isNaN(v) && v >= DIMENSION_LIMITS.height.min && v <= DIMENSION_LIMITS.height.max) {
      onHeightChange(v);
      setHeightInput(String(v));
    } else {
      setHeightInput(String(height));
    }
  };

  const handleSliderWidth = (v: number) => {
    onWidthChange(v);
    setWidthInput(String(v));
  };

  const handleSliderHeight = (v: number) => {
    onHeightChange(v);
    setHeightInput(String(v));
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t('title')}</h2>
        <p className="text-gray-500 dark:text-brand-grey">{t('subtitle')}</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-center">
        {/* Diagrama visual de la porta */}
        <div className="flex-1 flex justify-center">
          <DoorDiagram width={width} height={height} doorType={doorType} />
        </div>

        {/* Controls de mida */}
        <div className="flex-1 flex flex-col gap-8 w-full max-w-sm">
          {/* Ample */}
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-baseline">
              <label className="text-sm font-semibold text-gray-900 dark:text-white">{t('width')}</label>
              <div className="flex items-center gap-1">
                <input
                  type="text"
                  inputMode="numeric"
                  value={widthInput}
                  onChange={(e) => setWidthInput(e.target.value.replace(/[^0-9]/g, ''))}
                  onBlur={handleWidthBlur}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleWidthBlur(); }}
                  className="w-24 text-right text-2xl font-bold text-brand-red bg-transparent border-b-2 border-brand-red/30 focus:border-brand-red outline-none"
                />
                <span className="text-sm text-gray-400 dark:text-brand-grey">mm</span>
              </div>
            </div>
            <input
              type="range"
              min={DIMENSION_LIMITS.width.min}
              max={DIMENSION_LIMITS.width.max}
              step={1}
              value={width}
              onChange={(e) => handleSliderWidth(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand-red"
            />
            <div className="flex justify-between text-xs text-gray-400 dark:text-brand-grey">
              <span>{DIMENSION_LIMITS.width.min} mm</span>
              <span>{DIMENSION_LIMITS.width.max} mm</span>
            </div>
          </div>

          {/* Alçada */}
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-baseline">
              <label className="text-sm font-semibold text-gray-900 dark:text-white">{t('height')}</label>
              <div className="flex items-center gap-1">
                <input
                  type="text"
                  inputMode="numeric"
                  value={heightInput}
                  onChange={(e) => setHeightInput(e.target.value.replace(/[^0-9]/g, ''))}
                  onBlur={handleHeightBlur}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleHeightBlur(); }}
                  className="w-24 text-right text-2xl font-bold text-brand-red bg-transparent border-b-2 border-brand-red/30 focus:border-brand-red outline-none"
                />
                <span className="text-sm text-gray-400 dark:text-brand-grey">mm</span>
              </div>
            </div>
            <input
              type="range"
              min={DIMENSION_LIMITS.height.min}
              max={DIMENSION_LIMITS.height.max}
              step={1}
              value={height}
              onChange={(e) => handleSliderHeight(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand-red"
            />
            <div className="flex justify-between text-xs text-gray-400 dark:text-brand-grey">
              <span>{DIMENSION_LIMITS.height.min} mm</span>
              <span>{DIMENSION_LIMITS.height.max} mm</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
