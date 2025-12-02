import React from 'react';
import CountUp from '../CountUp';
import { useLanguage } from '../../LanguageContext';

const SuccessNumbers: React.FC = () => {
    const { language } = useLanguage();
    const isRTL = language === 'ar';

    const stats = [
        { val: 500, suffix: '+', label: isRTL ? "شركة مؤسسة" : "Companies Established" },
        { val: 98, suffix: '%', label: isRTL ? "نسبة رضا العملاء" : "Client Satisfaction" },
        { val: 10, suffix: '+', label: isRTL ? "سنوات خبرة" : "Years of Experience" },
        { val: 24, suffix: '/7', label: isRTL ? "دعم فني" : "Technical Support" } // 24/7 is tricky with CountUp, maybe just static text or custom handling?
        // CountUp expects a number. 24 is a number. suffix '/7'.
    ];

    return (
        <section className="py-16 bg-[#0B2B5B] text-white relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-400 rounded-full blur-[100px]"></div>
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-secondary rounded-full blur-[100px]"></div>
            </div>

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10 rtl:divide-x-reverse">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="pt-8 md:pt-0 animate-on-scroll" style={{ transitionDelay: `${idx * 100}ms` }}>
                            <div className="text-4xl md:text-5xl font-bold text-secondary mb-2 dir-ltr">
                                <CountUp end={stat.val} suffix={stat.suffix} duration={2.5} />
                            </div>
                            <p className="text-blue-100 font-medium text-lg">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SuccessNumbers;
