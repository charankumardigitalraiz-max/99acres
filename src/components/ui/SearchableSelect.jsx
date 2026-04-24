import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, Check } from 'lucide-react';
import { createPortal } from 'react-dom';

const SearchableSelect = ({
    label,
    value,
    onChange,
    options = [],
    placeholder = "Search...",
    className = "",
    labelClassName = "",
    containerClassName = ""
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });
    const triggerRef = useRef(null);
    const dropdownRef = useRef(null);

    const filteredOptions = options.filter(option => {
        const labelText = typeof option === 'object' ? option.label : option;
        return labelText.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const selectedOption = options.find(option => {
        const val = typeof option === 'object' ? option.value : option;
        return val === value;
    });

    const displayLabel = selectedOption 
        ? (typeof selectedOption === 'object' ? selectedOption.label : selectedOption)
        : placeholder;

    const updateCoords = () => {
        if (triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            setCoords({
                top: rect.bottom + window.scrollY,
                left: rect.left + window.scrollX,
                width: rect.width
            });
        }
    };

    useEffect(() => {
        if (isOpen) {
            updateCoords();
            window.addEventListener('resize', updateCoords);
            window.addEventListener('scroll', updateCoords, true);
        }
        return () => {
            window.removeEventListener('resize', updateCoords);
            window.removeEventListener('scroll', updateCoords, true);
        };
    }, [isOpen]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (triggerRef.current && !triggerRef.current.contains(event.target) &&
                dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (val) => {
        onChange({ target: { value: val } });
        setIsOpen(false);
        setSearchTerm('');
    };

    return (
        <div className={`flex flex-col gap-2.5 ${containerClassName}`}>
            {label && (
                <label className={`text-[10px] font-medium text-slate-400 uppercase tracking-widest ml-1 ${labelClassName}`}>
                    {label}
                </label>
            )}
            <div className="relative group" ref={triggerRef}>
                <div
                    onClick={() => setIsOpen(!isOpen)}
                    className={`w-full px-5 py-3.5 bg-slate-50/80 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 cursor-pointer outline-none transition-all flex items-center justify-between hover:bg-white hover:border-primary/30 ${isOpen ? 'ring-2 ring-primary/20 bg-white border-primary/30' : ''} ${className}`}
                >
                    <span className={!selectedOption ? 'text-slate-300' : ''}>{displayLabel}</span>
                    <ChevronDown size={14} className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-primary' : ''}`} />
                </div>

                {isOpen && createPortal(
                    <div 
                        ref={dropdownRef}
                        className="fixed z-[1001] bg-white border border-slate-100 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
                        style={{ 
                            top: coords.top + 8, 
                            left: coords.left, 
                            width: coords.width,
                            maxHeight: '300px'
                        }}
                    >
                        <div className="p-3 border-b border-slate-50 bg-slate-50/50">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                                <input
                                    autoFocus
                                    type="text"
                                    className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-[10px] font-bold uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all"
                                    placeholder="Type to filter..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onClick={(e) => e.stopPropagation()}
                                />
                            </div>
                        </div>
                        <div className="max-h-[200px] overflow-y-auto p-1 custom-scrollbar">
                            {filteredOptions.length > 0 ? (
                                filteredOptions.map((option) => {
                                    const isObject = typeof option === 'object';
                                    const val = isObject ? option.value : option;
                                    const labelText = isObject ? option.label : option;
                                    const isSelected = val === value;

                                    return (
                                        <div
                                            key={val}
                                            onClick={() => handleSelect(val)}
                                            className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer ${isSelected ? 'bg-primary/5 text-primary' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
                                        >
                                            <span>{labelText}</span>
                                            {isSelected && <Check size={12} />}
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="px-4 py-6 text-center">
                                    <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">No matching results</p>
                                </div>
                            )}
                        </div>
                    </div>,
                    document.body
                )}
            </div>
        </div>
    );
};

export default SearchableSelect;
