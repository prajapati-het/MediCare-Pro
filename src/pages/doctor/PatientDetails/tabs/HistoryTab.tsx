import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "@/redux/store";
import { motion } from "framer-motion";

export default function HistoryTab() {
  const { id } = useParams();
  const patient = useSelector((state: RootState) =>
    state.patients.list.find(p => p.id === Number(id))
  );

  if (!patient || patient.visitHistory.length === 0) {
    return <p className="text-muted-foreground mt-2">No visit history available.</p>;
  }

  return (
    <div className="relative mt-4">
      {/* Vertical timeline line */}
      <div className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-secondary rounded-full" />

      <div className="space-y-6">
        {patient.visitHistory.map((visit, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="flex relative pl-12 group"
          >
            {/* Timeline dot */}
            <div className="absolute left-4 top-3 w-4 h-4 rounded-full bg-primary border-2 border-background group-hover:scale-125 transition-transform" />

            {/* Card container */}
            <div className="flex-1 bg-background shadow-lg rounded-xl p-4 hover:shadow-2xl transition-shadow cursor-pointer">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-base md:text-lg">{visit.reason}</h3>
                <span className="text-xs md:text-sm text-muted-foreground">{visit.date}</span>
              </div>
              <hr className="my-2 border-dashed border-muted" />
              <div className="space-y-1 text-sm md:text-base text-muted-foreground">
                <p>
                  <span className="font-semibold text-primary">Diagnosis:</span> {visit.diagnosis}
                </p>
                <p>
                  <span className="font-semibold text-primary">Treatment:</span> {visit.treatment}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
