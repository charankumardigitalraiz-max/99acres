import React from 'react';
import Modal from '../ui/Modal';

export default function DeleteModel({ isOpen, onClose, onConfirm, itemType = '', title = "Delete Item", itemName }) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            size="sm"
        >
            <div className="space-y-4">
                <p className="text-sm text-slate-600">
                    Are you sure you want to delete this {itemType} {itemName ? 'item' : 'record'}? This action cannot be undone.
                </p>

                {itemName && (
                    <div className="p-3 bg-red-50 border border-red-100 rounded-lg text-sm text-red-600 font-medium break-words">
                        {itemName}
                    </div>
                )}

                <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
                    <button
                        onClick={onClose}
                        className="px-5 py-2.5 border border-slate-200 bg-white rounded-md text-[10px] font-bold text-slate-500 uppercase tracking-wider hover:bg-slate-50 transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-5 py-2.5 bg-rose-500 text-white rounded-md text-[10px] font-bold uppercase tracking-wider hover:bg-rose-600 shadow-sm transition-all active:scale-95"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </Modal>
    );
}