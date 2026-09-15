"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Table as TableIcon } from "lucide-react";

// ============================================================================
// 1. TABLE CONTAINER & WRAPPER
// ============================================================================
export interface JournalTableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  caption?: string | React.ReactNode;
  captionSide?: "top" | "bottom";
  striped?: boolean;
  compact?: boolean;
  hoverable?: boolean;
  wrapperClassName?: string;
  bordered?: boolean;
}

export function JournalTable({
  children,
  className,
  wrapperClassName,
  caption,
  captionSide = "bottom",
  striped = true,
  compact = false,
  hoverable = true,
  bordered = true,
  ...props
}: JournalTableProps) {
  return (
    <div className={cn("my-8 space-y-2.5", wrapperClassName)}>
      {caption && captionSide === "top" && (
        <div className="flex items-center gap-2 px-1 font-body text-xs sm:text-sm text-[#94A3B8]">
          <TableIcon className="w-3.5 h-3.5 text-[#10B981]" />
          <span>{caption}</span>
        </div>
      )}

      <div
        className={cn(
          "relative overflow-x-auto rounded-2xl bg-[#0B0F17]/90 backdrop-blur-md shadow-xl",
          bordered && "border border-white/10 ring-1 ring-white/5",
          "scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
        )}
      >
        <table
          className={cn(
            "w-full text-left border-collapse font-body text-sm sm:text-base",
            striped && "[&_tbody_tr:nth-child(even)]:bg-white/[0.02]",
            hoverable && "[&_tbody_tr:hover]:bg-white/[0.04] [&_tbody_tr]:transition-colors",
            compact && "[&_th]:py-2.5 [&_th]:px-3.5 [&_td]:py-2.5 [&_td]:px-3.5 text-xs sm:text-sm",
            className
          )}
          {...props}
        >
          {children}
        </table>
      </div>

      {caption && captionSide === "bottom" && (
        <div className="flex items-center justify-center gap-2 px-1 font-body text-xs text-[#94A3B8] text-center pt-1">
          <TableIcon className="w-3 h-3 text-[#10B981]/70" />
          <span>{caption}</span>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// 2. THEAD (TABLE HEADER WRAPPER)
// ============================================================================
export interface JournalTableHeadProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

export function JournalTableHead({ children, className, ...props }: JournalTableHeadProps) {
  return (
    <thead
      className={cn(
        "bg-[#161F2E] border-b border-white/10 text-xs font-heading font-bold uppercase tracking-wider text-[#94A3B8]",
        className
      )}
      {...props}
    >
      {children}
    </thead>
  );
}

// ============================================================================
// 3. TBODY (TABLE BODY WRAPPER)
// ============================================================================
export interface JournalTableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

export function JournalTableBody({ children, className, ...props }: JournalTableBodyProps) {
  return (
    <tbody className={cn("divide-y divide-white/[0.06] text-[#CBD5E1]", className)} {...props}>
      {children}
    </tbody>
  );
}

// ============================================================================
// 4. TFOOT (TABLE FOOTER WRAPPER)
// ============================================================================
export interface JournalTableFooterProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

export function JournalTableFooter({ children, className, ...props }: JournalTableFooterProps) {
  return (
    <tfoot
      className={cn(
        "bg-[#161F2E]/80 border-t-2 border-white/10 font-medium text-xs sm:text-sm text-[#F8FAFC]",
        className
      )}
      {...props}
    >
      {children}
    </tfoot>
  );
}

// ============================================================================
// 5. TR (TABLE ROW)
// ============================================================================
export interface JournalTableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  variant?: "default" | "highlight" | "mint" | "warning" | "danger" | "muted";
  selected?: boolean;
}

export function JournalTableRow({
  children,
  className,
  variant = "default",
  selected = false,
  ...props
}: JournalTableRowProps) {
  const variantStyles = {
    default: "",
    highlight: "bg-[#10B981]/10 hover:bg-[#10B981]/15 text-[#F8FAFC]",
    mint: "bg-[#10B981]/10 text-[#34D399]",
    warning: "bg-[#F59E0B]/10 hover:bg-[#F59E0B]/15 text-[#FBBF24]",
    danger: "bg-[#EF4444]/10 hover:bg-[#EF4444]/15 text-[#FCA5A5]",
    muted: "opacity-60 bg-transparent",
  };

  return (
    <tr
      className={cn(
        "border-b border-white/[0.04] last:border-none",
        variantStyles[variant],
        selected && "bg-[#10B981]/15",
        className
      )}
      {...props}
    >
      {children}
    </tr>
  );
}

// ============================================================================
// 6. TH (TABLE HEADER CELL)
// ============================================================================
export interface JournalTableHeaderCellProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  align?: "left" | "center" | "right";
}

export function JournalTableHeaderCell({
  children,
  className,
  align = "left",
  ...props
}: JournalTableHeaderCellProps) {
  const alignStyles = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <th
      className={cn(
        "px-4 sm:px-6 py-3.5 sm:py-4 font-heading font-semibold text-xs sm:text-sm text-[#F8FAFC] tracking-wider",
        alignStyles[align],
        className
      )}
      {...props}
    >
      {children}
    </th>
  );
}

// ============================================================================
// 7. TD (TABLE BODY CELL)
// ============================================================================
export interface JournalTableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  align?: "left" | "center" | "right";
  variant?: "default" | "mint" | "bold" | "mono" | "muted" | "badge";
}

export function JournalTableCell({
  children,
  className,
  align = "left",
  variant = "default",
  ...props
}: JournalTableCellProps) {
  const alignStyles = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  const variantStyles = {
    default: "text-[#CBD5E1]",
    mint: "text-[#10B981] font-semibold",
    bold: "font-semibold text-[#F8FAFC]",
    mono: "font-mono text-xs sm:text-sm text-[#34D399]",
    muted: "text-xs text-[#94A3B8]",
    badge: "font-medium",
  };

  return (
    <td
      className={cn(
        "px-4 sm:px-6 py-3.5 sm:py-4 font-body leading-relaxed align-middle",
        alignStyles[align],
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </td>
  );
}

// ============================================================================
// 8. TABLE CAPTION / TITLE COMPONENT
// ============================================================================
export interface JournalTableCaptionProps extends React.HTMLAttributes<HTMLTableCaptionElement> {}

export function JournalTableCaption({
  children,
  className,
  ...props
}: JournalTableCaptionProps) {
  return (
    <caption
      className={cn("p-3 text-xs sm:text-sm text-[#94A3B8] text-center font-body", className)}
      {...props}
    >
      {children}
    </caption>
  );
}

// ============================================================================
// 9. CONVENIENCE DECLARATIVE COMPONENT: JournalDataTable
// ============================================================================
export interface JournalDataTableProps {
  headers: Array<string | React.ReactNode>;
  rows: Array<Array<string | React.ReactNode>>;
  caption?: string | React.ReactNode;
  captionSide?: "top" | "bottom";
  striped?: boolean;
  compact?: boolean;
  highlightRowIndex?: number;
  className?: string;
  wrapperClassName?: string;
}

export function JournalDataTable({
  headers,
  rows,
  caption,
  captionSide = "bottom",
  striped = true,
  compact = false,
  highlightRowIndex,
  className,
  wrapperClassName,
}: JournalDataTableProps) {
  return (
    <JournalTable
      caption={caption}
      captionSide={captionSide}
      striped={striped}
      compact={compact}
      className={className}
      wrapperClassName={wrapperClassName}
    >
      <JournalTableHead>
        <JournalTableRow>
          {headers.map((header, idx) => (
            <JournalTableHeaderCell key={idx}>{header}</JournalTableHeaderCell>
          ))}
        </JournalTableRow>
      </JournalTableHead>
      <JournalTableBody>
        {rows.map((row, rowIdx) => (
          <JournalTableRow
            key={rowIdx}
            variant={highlightRowIndex === rowIdx ? "highlight" : "default"}
          >
            {row.map((cell, cellIdx) => (
              <JournalTableCell key={cellIdx}>{cell}</JournalTableCell>
            ))}
          </JournalTableRow>
        ))}
      </JournalTableBody>
    </JournalTable>
  );
}

// ============================================================================
// CONCISE ALIASES FOR EDITORIAL PRODUCTIVITY
// ============================================================================
export const Table = JournalTable;
export const THead = JournalTableHead;
export const TBody = JournalTableBody;
export const TFoot = JournalTableFooter;
export const TR = JournalTableRow;
export const TH = JournalTableHeaderCell;
export const TD = JournalTableCell;
export const TableCaption = JournalTableCaption;
export const DataTable = JournalDataTable;
