using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MiYou.DAL.ContextFactory
{
    public interface IContextFactory
    {
        DatabaseContext Create();
    }
}