const fs = require('fs');

const filepath = 'src/pages/propertyDetails2.jsx';
const text = fs.readFileSync(filepath, 'utf-8');

// Markers
const m_main_start = '                    <div className="space-y-4 animate-in fade-in duration-500">';
const m_cover_start = '                                {/* Cover Photo */}';
const m_right_col_start = '                            {/* Right Column: Uploader Card + Ownership Proofs */}';
const m_row2_start = '                        {/* Row 2: 5-Tab Details + Financial Sidebar */}';
const m_tabbed_start = '                                <div className="bg-white rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-200/20 overflow-hidden">';
const m_bottom_bar = '                        {/* Bottom Admin Actions Bar */}';

const pre_text = text.substring(0, text.indexOf(m_main_start));

let left1 = text.substring(text.indexOf(m_cover_start), text.indexOf(m_right_col_start));
left1 = left1.substring(0, left1.lastIndexOf('                            </div>')).trimEnd();

let right_content_start = text.indexOf('                                    <div className="bg-white rounded-[2rem] border border-primary/20 shadow-2xl');
let right_content = text.substring(right_content_start, text.indexOf(m_row2_start));
right_content = right_content.substring(0, right_content.lastIndexOf('</div>'));
right_content = right_content.substring(0, right_content.lastIndexOf('</div>'));
right_content = right_content.substring(0, right_content.lastIndexOf('</div>')).trimEnd();

let left2 = text.substring(text.indexOf(m_tabbed_start), text.indexOf(m_bottom_bar));
left2 = left2.substring(0, left2.lastIndexOf('</div>'));
left2 = left2.substring(0, left2.lastIndexOf('</div>'));
left2 = left2.substring(0, left2.lastIndexOf('</div>')).trimEnd();

const post_text = text.substring(text.indexOf(m_bottom_bar));

const newFile = `${pre_text}                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-500">
                        {/* LEFT COLUMN: Main Information */}
                        <div className="lg:col-span-8 flex flex-col gap-6">
${left1}

${left2}
                        </div>

                        {/* RIGHT COLUMN: Financials & Admin Actions */}
                        <div className="lg:col-span-4 flex flex-col gap-6">
${right_content}
                        </div>
                    </div>
${post_text}`;

fs.writeFileSync(filepath, newFile, 'utf-8');
console.log('Done!');
