import React from 'react';
import { Zap, Users, Headphones, ArrowRight, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../../LanguageContext';

const WhyChooseUs: React.FC = () => {
    const { language } = useLanguage();
    const isRTL = language === 'ar';

    const features = [
        {
            icon: Zap,
            title: isRTL ? "إنجاز سريع" : "Fast Execution",
            desc: isRTL ? "نلتزم بأعلى معايير السرعة في إنجاز المعاملات الحكومية لضمان بدء نشاطك التجاري في وقت قياسي." : "We adhere to the highest speed standards in processing government transactions to ensure your business starts in record time."
        },
        {
            icon: Users,
            title: isRTL ? "خبرة ممتدة" : "Extended Expertise",
            desc: isRTL ? "فريقنا مكون من نخبة من الخبراء والمستشارين ذوي الخبرة الطويلة في الأنظمة واللوائح السعودية." : "Our team consists of elite experts and consultants with extensive experience in Saudi regulations and laws."
        },
        {
            icon: Headphones,
            title: isRTL ? "دعم متواصل" : "Continuous Support",
            desc: isRTL ? "فريق خدمة العملاء جاهز للرد على استفساراتكم وتقديم الدعم الفني على مدار الساعة طوال أيام الأسبوع." : "Our customer service team is ready to answer your inquiries and provide technical support 24/7."
        }
    ];

    return (
        <section className="py-20 bg-gray-50 relative overflow-hidden">
            {/* Subtle Pattern Background */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#444 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                <div className="text-center mb-16 animate-on-scroll">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        {isRTL ? "لماذا تختار إتمام؟" : "Why Choose Etmaam?"}
                    </h2>
                    <div className="w-20 h-1.5 bg-secondary mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, idx) => (
                        <div
                            key={idx}
                            className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
                        >
                            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                <feature.icon size={32} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors">
                                {feature.title}
                            </h3>
                            <p className="text-gray-500 leading-relaxed">
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
